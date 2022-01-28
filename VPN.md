[Tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-openvpn-server-on-ubuntu-18-04)

We will set up everything in one host.

Titles are used to tell us which actions are performed for the **CA Server** and which for the **VPN Server**.

```bash
adduser --disabled-password --gecos "" <USERNAME>
usermod -aG sudo <USERNAME>
passwd -d <USERNAME>
sudo -i -u <USERNAME>
sudo apt update && sudo apt install openvpn -y

```

### **CA Server**

```bash
wget -P ~/ https://github.com/OpenVPN/easy-rsa/releases/download/v3.0.8/EasyRSA-3.0.8.tgz
cd ~ && tar -xf ~/EasyRSA-3.0.8.tgz
mv ~/EasyRSA-3.0.8 ~/cert_auth_dir
cp ~/cert_auth_dir/vars.example ~/cert_auth_dir/vars
```

```
vi ~/cert_auth_dir/vars
# append this:
...
set_var EASYRSA_REQ_COUNTRY     "BA"
set_var EASYRSA_REQ_PROVINCE    "FBiH"
set_var EASYRSA_REQ_CITY        "Srebrenik"
set_var EASYRSA_REQ_ORG         "Enki doo"
set_var EASYRSA_REQ_EMAIL       "h.joldic@enki.ba"
set_var EASYRSA_REQ_OU          "Default OU"
```

```bash
cd ~/cert_auth_dir && ./easyrsa init-pki && ./easyrsa build-ca nopass
# press [ENTER]
```

### **VPN Server**

```bash
wget -P ~/ https://github.com/OpenVPN/easy-rsa/releases/download/v3.0.8/EasyRSA-3.0.8.tgz
cd ~ && tar -xf ~/EasyRSA-3.0.8.tgz
mv ~/EasyRSA-3.0.8 ~/vpn_server_dir
cp ~/vpn_server_dir/vars.example ~/vpn_server_dir/vars
```

```
vi ~/vpn_server_dir/vars
# append this:
...
set_var EASYRSA_REQ_COUNTRY     "BA"
set_var EASYRSA_REQ_PROVINCE    "FBiH"
set_var EASYRSA_REQ_CITY        "Srebrenik"
set_var EASYRSA_REQ_ORG         "Enki doo"
set_var EASYRSA_REQ_EMAIL       "h.joldic@enki.ba"
set_var EASYRSA_REQ_OU          "Default OU"
```

```bash
cd ~/vpn_server_dir && ./easyrsa init-pki && ./easyrsa gen-req server nopass
# press [ENTER]
```

```bash
sudo cp ~/vpn_server_dir/pki/private/server.key /etc/openvpn/
```

### **CA Server**

```bash
cd ~/cert_auth_dir && ./easyrsa import-req ~/vpn_server_dir/pki/reqs/server.req server && ./easyrsa sign-req server server
# type "yes" and press [ENTER]
```

### **VPN Server**

```bash
sudo cp ~/cert_auth_dir/pki/issued/server.crt ~/cert_auth_dir/pki/ca.crt /etc/openvpn/
cd ~/vpn_server_dir && ./easyrsa gen-dh
# wait...
```

```bash
openvpn --genkey --secret ~/vpn_server_dir/ta.key
sudo cp ~/vpn_server_dir/ta.key ~/vpn_server_dir/pki/dh.pem /etc/openvpn/
```

## Configure OpenVPN service

```bash
sudo cp /usr/share/doc/openvpn/examples/sample-config-files/server.conf.gz /etc/openvpn/
sudo gzip -d /etc/openvpn/server.conf.gz
```

```
sudo vi /etc/openvpn/server.conf
# append this:
...
tls-auth ta.key 0 # This file is secret
cipher AES-256-CBC
auth SHA256
dh dh.pem
user nobody
group nogroup
push "redirect-gateway def1 bypass-dhcp"
push "dhcp-option DNS 208.67.222.222"
push "dhcp-option DNS 208.67.220.220"
explicit-exit-notify 0
cert server.crt
key server.key
```

## Adjust server networking configuration

```
sudo vi /etc/sysctl.conf
# append this:
...
net.ipv4.ip_forward=1
```

```bash
sudo sysctl -p
```

### check if eth0 is the default interface

```bash
ip route | grep default
```

```
sudo vi /etc/ufw/before.rules
# prepend this:
# START OPENVPN RULES
# NAT table rules
*nat
:POSTROUTING ACCEPT [0:0]
# Allow traffic from OpenVPN client to eth0 (change to the interface you discovered!)
-A POSTROUTING -s 10.8.0.0/8 -o eth0 -j MASQUERADE
COMMIT
# END OPENVPN RULES
...
```

```
sudo vi /etc/default/ufw
# append this:
...
DEFAULT_FORWARD_POLICY="ACCEPT"
```

```bash
sudo ufw allow 1194/udp
sudo ufw allow OpenSSH
sudo ufw disable
sudo ufw enable
# type "yes" and press [ENTER]
```

## Start and anable OpenVPN service

```bash
sudo systemctl start openvpn@server
sudo systemctl status openvpn@server
```

```bash
sudo systemctl enable openvpn@server
```

# Create client keys

## Create client configuration infrastructure

```bash
mkdir -p ~/client_configs/<CLIENT_NAME>/files
mkdir -p ~/client_configs/<CLIENT_NAME>/keys
cp /usr/share/doc/openvpn/examples/sample-config-files/client.conf ~/client_configs/<CLIENT_NAME>/base.conf
```

```
vi ~/client_configs/<CLIENT_NAME>/base.conf
# delete this:
remote my-server-1 1194
ca ca.crt
cert client.crt
key client.key
tls-auth
#---
```

```
# append this:
...
remote <VPN_SERVER_IP> 1194
user nobody
group nogroup
cipher AES-256-CBC
auth SHA256
key-direction 1

; systemd-resolved
script-security 2
up /etc/openvpn/update-systemd-resolved
down /etc/openvpn/update-systemd-resolved
down-pre
dhcp-option DOMAIN-ROUTE .

; non-systemd-resolved
; script-security 2
; up /etc/openvpn/update-resolv-conf
; down /etc/openvpn/update-resolv-conf
```

```bash
vi ~/client_configs/<CLIENT_NAME>/make_config.sh
# append this:
#!/bin/bash

# First argument: Client identifier

CA_DIR=/home/<USERNAME>/cert_auth_dir
VPN_SERVER_DIR=/home/<USERNAME>/vpn_server_dir
KEY_DIR=/home/<USERNAME>/client_configs/<CLIENT_NAME>/keys
OUTPUT_DIR=/home/<USERNAME>/client_configs/<CLIENT_NAME>/files
BASE_CONFIG=/home/<USERNAME>/client_configs/<CLIENT_NAME>/base.conf

cat ${BASE_CONFIG} \
    <(echo -e '<ca>') \
    ${CA_DIR}/pki/ca.crt \
    <(echo -e '</ca>\n<cert>') \
    ${KEY_DIR}/${1}.crt \
    <(echo -e '</cert>\n<key>') \
    ${KEY_DIR}/${1}.key \
    <(echo -e '</key>\n<tls-auth>') \
    ${VPN_SERVER_DIR}/ta.key \
    <(echo -e '</tls-auth>') \
    > ${OUTPUT_DIR}/${1}.ovpn
```

```bash
chmod 700 ~/client_configs/<CLIENT_NAME>/make_config.sh
```

## Create client cert

```bash
cd ~/vpn_server_dir && ./easyrsa gen-req <CLIENT_NAME> nopass
# press [ENTER]
cp ~/vpn_server_dir/pki/private/<CLIENT_NAME>.key ~/client_configs/<CLIENT_NAME>/keys/
```

### **CA Server**

```bash
cd ~/cert_auth_dir && ./easyrsa import-req ~/vpn_server_dir/pki/reqs/<CLIENT_NAME>.req <CLIENT_NAME> && ./easyrsa sign-req client <CLIENT_NAME>
# type "yes" and press [ENTER]
```

### **VPN Server**

```
cp ~/cert_auth_dir/pki/issued/<CLIENT_NAME>.crt ~/client_configs/<CLIENT_NAME>/keys/
```

```bash
sudo ~/client_configs/<CLIENT_NAME>/make_config.sh <CLIENT_NAME>
```

```
ls ~/client_configs/<CLIENT_NAME>/files
```

# Firewall settings

| Source             | Protocol | Port | Description |
| :----------------- | :------: | ---: | ----------: |
| Any IPv4, Any IPv6 |   TCP    |   22 |         SSH |
| Any IPv4, Any IPv6 |   UDP    | 1194 |         VPN |
