// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";
import { studyroomList } from "./fixtures";

export const handlers = [
  rest.get("/bookmark", (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        name: "도비들의 공부방",
        hashtags: ["교시제", "아침기상", "평일"],
        rule: "매일매일 출석하기",
        currentUsers: 3,
        limitUsers: 6,
        endAt: "2022-12-31",
        participant: [
          {
            nickname: "아메바",
            joinTime: "2022-10-26T10:00:00",
          },
          {
            nickname: "쥐쥐",
            joinTime: "2022-10-26T08:00:00",
          },
          {
            nickname: "주픵",
            joinTime: "2022-10-26T23:00:00",
          },
        ],
      }),
    ),
  ),
  rest.get("/study-room", (req, res, ctx) => {
    const SIZE_PER_PAGE = 16;

    const query = {
      page: req.url.searchParams.get("page") ?? 0,
      isPublic: req.url.searchParams.get("isPublic"),
      category: req.url.searchParams.get("category"),
      name: req.url.searchParams.get("name"),
    };

    let result = studyroomList.filter(({ isPublic, category, name }) => {
      if (query.isPublic && isPublic === false) return false;
      if (query.category && category !== query.category) return false;
      if (query.name && name.includes(query.name)) return false;
      return true;
    });

    if (req.url.searchParams.get("sort")) result = result.sort((a, b) => b.currentUsers - a.currentUsers);

    return res(ctx.status(200), ctx.json(result.slice(query.page * SIZE_PER_PAGE, (query.page + 1) * SIZE_PER_PAGE)));
  }),
  rest.get("/user/info", (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        nickname: "쥐쥐",
      }),
    ),
  ),
  rest.get("/participant/count", (_, res, ctx) =>
    res(ctx.status(200), ctx.json(studyroomList.reduce((acc, cur) => acc + cur.currentUsers, 0))),
  ),
];
