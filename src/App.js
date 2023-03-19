import React, { useEffect, useReducer } from "react";
import data from "./data.json";
import { BsDot } from "react-icons/bs";
import removeIcon from "./assets/icon-remove.svg";

const initialState = {
  all_products: [...data],
  filtered_products: [...data],
  filter: [],
  temp: [],
};

const reducer = (state, action) => {
  if (action.type === "SELECT FILTER") {
    const { filtered_products, filter } = state;
    const value = action.payload;
    let tempJob = [...filtered_products];
    if (!filter.includes(value)) {
      tempJob = tempJob.filter((item) => {
        const skills = [item.level, item.role];
        skills.push(...item.languages);
        skills.push(...item.tools);

        return skills.some((mov) => mov === value);
      });
    } else {
      return { ...state };
    }
    return {
      ...state,
      filtered_products: tempJob,
      filter: [...filter, value],
    };
  }
  if (action.type === "CLEAR FILTER") {
    const { all_products } = state;
    let tempJob = [...all_products];
    return { ...state, filtered_products: tempJob, filter: [] };
  }
  if (action.type === "CANCEL FILTER") {
    const { all_products, filter } = state;
    const tag = action.payload;
    let tempJob = [...all_products];
    let filtered = [];
    if (tag) {
      filtered = filter.filter((item) => {
        return item !== tag;
      });
      tempJob = tempJob.filter((item) => {
        const skills = [item.level, item.role];
        skills.push(...item.languages);
        skills.push(...item.tools);
        return filtered.every((mov) => skills.includes(mov));
      });
    }

    return { ...state, filtered_products: tempJob, filter: filtered };
  }

  throw new Error(`No matching "(${action.type})" action type`);
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { filtered_products } = state;

  const handleClick = (e) => {
    const value = e.target.textContent;
    dispatch({ type: "SELECT FILTER", payload: value });
  };
  const handleClear = () => {
    dispatch({ type: "CLEAR FILTER" });
  };
  const handleCancel = (tag) => {
    dispatch({ type: "CANCEL FILTER", payload: tag });
  };

  return (
    <main className="font-leagueSpartan">
      <header className="bg-header-bg h-[7rem] bg-no-repeat bg-header-bg2" />
      <section className="bg-main-bg min-h-screen flex flex-col px-6 pt-14 pb-10 sm:px-0 gap-7">
        {state.filter.length < 1 ? (
          ""
        ) : (
          <article className="sm:mx-10 bg-main-bg mt-[-6rem] rounded-md">
            <div className="min-h-[4.5rem] border shadow-lg rounded-md bg-white flex flex-wrap py-3 sm:py-0 gap-3 px-6 items-center">
              {state.filter.map((item, index) => {
                return (
                  <div className="flex" key={index}>
                    <p className="px-2 py-1.5 bg-filter-tab text-header-bg2 rounded-l-md text-md">
                      {item}
                    </p>
                    <div
                      className="bg-header-bg2 px-1.5 grid items-center rounded-r-md hover:bg-featured-tab cursor-pointer"
                      onClick={() => handleCancel(item)}
                    >
                      <img src={removeIcon} alt="removeIcon" className="h-2" />
                    </div>
                  </div>
                );
              })}
              <div
                className="text-header-bg2 ml-auto text-lg my-auto font-semibold underline cursor-pointer"
                onClick={handleClear}
              >
                Clear
              </div>
            </div>
          </article>
        )}
        {filtered_products.map((job) => {
          const {
            id,
            company,
            logo,
            featured,
            position,
            level,
            postedAt,
            role,
            contract,
            location,
            languages,
            tools,
            new: fresh,
          } = job;

          const allSkills = [level, role];
          allSkills.push(...tools);
          allSkills.push(...languages);

          return (
            <div
              className={`sm:w-[90%] w-full sm:h-[9rem] grid sm:grid-cols-2 sm:grid-rows-none grid-rows-2 border border-8 mx-auto content-center shadow-xl px-4 sm:px-0 rounded-lg bg-white border-transparent ${
                featured && "border-l-header-bg2"
              }`}
              key={id}
            >
              <div className="grid sm:grid-cols-gridProfile grid-rows-gridProfile grid-cols-1 sm:gap-2 sm:items-center border border-transparent border-b-gray-500 sm:border-none pb-4">
                <img
                  src={logo}
                  alt="company"
                  className="sm:m-auto h-5/6 sm:h-full mt-[-1.2em]"
                />
                <div className="grid gap-1">
                  <div className="flex gap-2 items-center font-bold">
                    <h2 className="text-xs sm:text-sm text-header-bg2">
                      {company}
                    </h2>
                    {fresh && (
                      <p className="bg-header-bg2 px-1 text-white rounded-xl text-[0.6rem] sm:text-xs uppercase">
                        new!
                      </p>
                    )}
                    {featured && (
                      <p className="bg-featured-tab px-2 text-white rounded-xl text-[0.6rem] sm:text-xs uppercase">
                        featured
                      </p>
                    )}
                  </div>
                  <h1 className="text-sm sm:text-md font-bold text-featured-tab">
                    {position}
                  </h1>
                  <div className="flex gap-2 items-center opacity-50 text-[0.65rem] sm:text-xs font-bold">
                    <p>{postedAt}</p>
                    <BsDot />
                    <p>{contract}</p>
                    <BsDot />
                    <p>{location}</p>
                  </div>
                </div>
              </div>
              <div className="sm:ml-auto flex gap-4 sm:gap-2 sm:pr-6 flex-wrap mb-auto pt-4 sm:pt-0 sm:my-auto">
                {allSkills.map((language, index) => {
                  return (
                    <h3
                      className="bg-filter-tab px-2 py-[0.45rem] rounded-md text-header-bg2 font-bold text-sm cursor-pointer"
                      key={index}
                      onClick={handleClick}
                    >
                      {language}
                    </h3>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default App;
