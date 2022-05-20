const Application = require('../models/application');
const fs = require('fs');

exports.createApplication = async (req, res) => {
	try {
		let application;
		console.log(req.files);
		if (req.body._id != null) {
			application = await Application.findByIdAndUpdate(
				req.body._id,
				{
					...req.body,
					attachments: req.files,
				},
				{
					new: true,
					// status: req.body.status && req.body.status,
				}
			);
		} else {
			application = new Application({
				...req.body,
				belongsTo: req.user._id,
			});
			application.attachments = req.files;
		}
		const result = await application.save();

		res.status(201).json({
			message: 'Application created successfully!',
			application,
		});
	} catch (e) {
		console.log(e);
	}
};

exports.getApplication = async (req, res, next) => {
	try {
		const application = await Application.findById(req.params.id);
		if (!application) {
			res.status(404).json({
				message: 'Application was not found!',
			});
			return;
		}
		if (application.belongsTo.toString() != req.user._id.toString()) {
			res.status(404).json({
				message: 'You are not authenticated to view this application!',
			});
			return;
		}

		return res.json({
			message: 'Application was found!',
			application,
		});
	} catch (e) {
		console.log(e);
	}
};

exports.getAllApplications = async (req, res, next) => {
	try {
		const applications = await Application.find({ belongsTo: req.user._id });
		if (applications.length === 0) {
			return res.status(404).json({
				message: 'You have no applications!',
			});
		}
		return res.json({
			message: 'Applications were found!',
			applications,
		});
	} catch (e) {
		console.log(e);
	}
};
