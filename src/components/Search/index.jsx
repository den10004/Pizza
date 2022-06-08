import React from "react";

import styles from "./Search.modules.scss";

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className={styles.root}>
      <button className={styles.icon}>Найти</button>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <button onClick={() => setSearchValue("")} className={styles.clear}>
          11
        </button>
      )}
    </div>
  );
};

export default Search;
