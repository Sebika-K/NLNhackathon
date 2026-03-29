// In-session store for stories the user marked as helpful
let _helpfulStories = [];

export const addHelpfulStory = (story) => {
  if (!_helpfulStories.find((s) => s.id === story.id || s.title === story.title)) {
    _helpfulStories = [story, ..._helpfulStories];
  }
};

export const getHelpfulStories = () => _helpfulStories;
