import { CATEGORY_OPTIONS, HASHTAG_OPTIONS } from "@utils/constants/options";

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getRandomCategory = () => CATEGORY_OPTIONS[getRandomInt(0, CATEGORY_OPTIONS.length)].value;
const getRandomHashtags = (max) =>
  new Array(max).fill(0).map((_) => HASHTAG_OPTIONS[getRandomInt(0, HASHTAG_OPTIONS.length)]);
const getRandomBoolean = () => Boolean(getRandomInt(0, 2));

export const studyroomList = Array.from(new Array(100), (_, i) => ({
  id: i,
  name: `도비전용 ${i}호실`,
  category: getRandomCategory(),
  hashtags: [...new Set(getRandomHashtags(getRandomInt(1, 7)))],
  isPublic: getRandomBoolean(),
  currentUsers: getRandomInt(0, 7),
  limitUsers: 6,
}));
