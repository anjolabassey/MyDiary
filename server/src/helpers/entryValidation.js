
const entryValidation = (req, res, next) => {
  const { title, body } = req.body;
  if (!title) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Please enter entry title field'
    });
  } else if (!body) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Please enter entry body field'
    });
  } else if (title.trim().length < 1) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Empty spaces are not valid, please enter Entry title'
    });
  } else if (body.trim().length < 1) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Empty spaces are not valid, please enter Entry body'
    });
  } else if (title === 'true' || title === 'false') {
    return res.status(400).json({
      status: 'Failed',
      message: 'Booleans cannot be entered as entry title'
    });
  } else if (body === 'true' || body === 'false') {
    return res.status(400).json({
      status: 'Failed',
      message: 'Booleans cannot be entered'
    });
  } else {
    next();
  }
};

export default entryValidation;