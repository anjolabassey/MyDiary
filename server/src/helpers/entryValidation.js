
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
  } else {
    next();
  }
};

export default entryValidation;