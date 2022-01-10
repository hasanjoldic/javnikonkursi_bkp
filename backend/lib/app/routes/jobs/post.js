"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _bodyParser = require("body-parser");

var _httpStatusCodes = require("http-status-codes");

var _expressValidator = require("express-validator");

var _multer = _interopRequireDefault(require("multer"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
var jsonParser = (0, _bodyParser.json)();
var upload = (0, _multer["default"])();
var s3 = new _awsSdk["default"].S3();
router.post("/api/v1/jobs", jsonParser, // body(JobField.company_id).isString(),
// body(JobField.job_type_id).isString(),
// body(JobField.title).isString(),
// body(JobField.location).isString().optional(),
// body(JobField.start_date).isString(),
// body(JobField.end_date).isString(),
// body(JobField.external_url).isString().optional(),
(0, _expressValidator.body)("internalFile").isString(), upload.single("internalFile"), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var errors;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context.next = 4;
              break;
            }

            console.log(req.body);
            return _context.abrupt("return", res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json({
              errors: errors.array()
            }));

          case 4:
            // const {
            //   company_id,
            //   job_type_id,
            //   title,
            //   location,
            //   start_date,
            //   end_date,
            //   external_url,
            // } = req.body;
            // const postQuery = await client.query<jobsReturnType>(
            //   `
            //   INSERT INTO jobs as (
            //     company_id,
            //     job_type_id,
            //     title,
            //     location,
            //     start_date,
            //     end_date,
            //     external_url,
            //   )
            //   VALUES ($1, $2, $3, $4, $5, $6, $7)
            //   RETURNING ${jobsReturnFields.join(", ")}
            // `,
            //   [
            //     company_id,
            //     job_type_id,
            //     title,
            //     location,
            //     start_date,
            //     end_date,
            //     external_url,
            //   ]
            // );
            // const job = postQuery.rows[0];
            // if (job && req.file?.path) {
            //   const ext = req.file.originalname.split(".").reverse()[0];
            //   const s3FileName = `${job.id}.${ext}`;
            //   const upload = await s3
            //     .putObject({
            //       Bucket: process.env.AWS_S3_BUCKET_NAME as string,
            //       Key: s3FileName,
            //       Body: fs.createReadStream(req.file?.path, "utf8"),
            //       ACL: "public-read",
            //     })
            //     .promise();
            //   if (upload.$response.error) {
            //     console.error(upload.$response.error);
            //   } else {
            //     const s3PublicPath = `${process.env.AWS_S3_PUBLIC_URL}/${s3FileName}`;
            //     const addInternalUrlQuery = await client.query<
            //       Pick<Job, JobField.internal_url>
            //     >(
            //       `
            //       UPDATE jobs
            //       SET internal_url = $2
            //       WHERE id = $1
            //       RETURNING internal_url
            //     `,
            //       [job.id, s3PublicPath]
            //     );
            //     res.status(StatusCodes.OK).json({
            //       ...job,
            //       internal_url: addInternalUrlQuery.rows?.[0]?.internal_url,
            //     });
            //     return;
            //   }
            // }
            console.log(req.file); // const ext = req.file.originalname.split(".").reverse()[0];
            // const s3FileName = `${job.id}.${ext}`;
            // const upload = await s3
            //   .putObject({
            //     Bucket: process.env.AWS_S3_BUCKET_NAME as string,
            //     Key: s3FileName,
            //     Body: fs.createReadStream(req.file?.path, "utf8"),
            //     ACL: "public-read",
            //   })
            //   .promise();
            // if (upload.$response.error) {
            //   console.error(upload.$response.error);
            // } else {
            //   const s3PublicPath = `${process.env.AWS_S3_PUBLIC_URL}/${s3FileName}`;
            //   const addInternalUrlQuery = await client.query<
            //     Pick<Job, JobField.internal_url>
            //   >(
            //     `
            //       UPDATE jobs
            //       SET internal_url = $2
            //       WHERE id = $1
            //       RETURNING internal_url
            //     `,
            //     [job.id, s3PublicPath]
            //   );
            //   res.status(StatusCodes.OK).json({
            //     ...job,
            //     internal_url: addInternalUrlQuery.rows?.[0]?.internal_url,
            //   });
            //   return;
            // }
            // res.status(StatusCodes.OK).json(job);

            res.status(_httpStatusCodes.StatusCodes.OK);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;