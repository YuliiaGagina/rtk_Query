import React, { useState, useEffect } from "react";
import { useLazyGetUsersReportQuery, useSearchUsersQuery } from "../store/github/github.api";
import { useDebounce } from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);
  const [dropdown, setDropdown] = useState(false);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });
  const [fetchRepos, {isLoading: repoLoading, isError: repoError, data: repos} ] = useLazyGetUsersReportQuery()

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0);
    // console.log(debounced);
  }, [debounced, data]);

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false)
  }

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">Something went wrong...</p>
      )}

      <div className="relative w-[560px] ">
        <input
          className="border px-2 py-4 w-full h-[42px] mb-2"
          type="text"
          placeholder="Search for Github username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {dropdown && (
          <ul className="list-none abtolute top-[42px] left-0 right-0  max-h-[200px] overflow-x-scroll   shadow-md bg-white">
            {isLoading && <p className="text-center">Loading...</p>}
            {data?.map((user) => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
         <div className="container">
          {repoLoading && <p className="text-center">Repos are loading...</p>}
          {repos?.map(repo => (
            <RepoCard repo={repo} key={repo.id } />
          ))}
      </div>
      </div>
     
    </div>
  );
};

export default HomePage;
