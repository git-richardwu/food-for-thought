import { useState, useEffect } from 'react';
import SearchImage from "../../assets/icons8-search.svg";
import ShuffleImage from "../../assets/shuffle-svgrepo-com.svg"
import Heart from "../../assets/heart3.png";
import "./Posts.css";

const SearchBar = ({searchPosts, shuffle, preferredTags}) => {
    const [searchText, setText] = useState("");
    const [searchTitle, setSearchTitle] = useState(true);
    const [searchTag, setSearchTag] = useState(true);
    const [searchCalorie, setSearchCalorie] = useState(true);
    const [results, setResults] = useState("");

    const submitSearch = () => {
        if (searchText !== ""){
            setResults("Results for: " + searchText);
            setText("");
            searchPosts(searchText.toLowerCase(), searchTitle, searchTag, searchCalorie);
        }else{
            searchPosts("", false, false, false);
            setResults("");
        }
    }

    // reason for this is to ensure at least 1 filter is always selected
    const setFilter = (option) => {
        if (option === "title"){
            if (searchTag || searchCalorie){
                setSearchTitle(!searchTitle);
            }else{
                setSearchTitle(true);
            }
        }else if (option === "tag"){
            if (searchTitle || searchCalorie){
                setSearchTag(!searchTag)
            }else{
                setSearchTag(true);
            }
        }else if (option === "calorie"){
            if (searchTitle || searchTag){
                setSearchCalorie(!searchCalorie)
            }else{
                setSearchCalorie(true);
            }
        }
    }

    const submitOnEnter = (key) => {
        if (key === "Enter"){
            submitSearch();
        }
    }

    const checkOnEnter = (key, filter) => {
        if (key === "Enter"){
            setFilter(filter);
        }
    }

    const shuffleOnKey = (key) => {
        if (key == "Enter"){
            shuffle();
        }
    }

    const sortPrefOnKey = (key) => {
        if (key == "Enter"){
            preferredTags();
        }
    }

    return (
        <div className="searchContainer">
            <div className="searchBarContainer">
                <input className="searchBar" type="text" placeholder="Search.." onChange={e => setText(e.target.value)} value={searchText} onKeyPress={e => submitOnEnter(e.key)}/>
                <img
                    src={SearchImage}
                    tabIndex="0"
                    className="searchButton"
                    alt="search"
                    onKeyPress={e => submitOnEnter(e.key)}
                    onClick={e => submitSearch()}
                />
            </div>
            <div className="lowerSearchContainer">
                <div className="searchFilters">
                    <input className="filter" type="checkbox" value="title" checked={searchTitle} onChange={e => setFilter("title")} onKeyPress={e => checkOnEnter(e.key, "title")}/>
                    <label className="flterLabel">Title</label>
                    <input className="filter" type="checkbox" value="dietTag" checked={searchTag} onChange={e => setFilter("tag")} onKeyPress={e => checkOnEnter(e.key, "tag")}/>
                    <label className="flterLabel">Diet Tags</label>
                    <input className="filter" type="checkbox" value="calroie" checked={searchCalorie} onChange={e => setFilter("calorie")} onKeyPress={e => checkOnEnter(e.key, "calorie")}/>
                    <label className="flterLabel">Calories</label>
                </div>   
                <img
                    src={ShuffleImage}
                    tabIndex="0"
                    alt="shuffle"
                    className="shuffleButton"
                    onKeyPress={e => shuffleOnKey(e.key)}
                    onClick={e => shuffle()}
                />
            </div>
            <div className="preferrenceButton" >
                <img
                    src={Heart}
                    tabIndex="0"
                    alt="preferrence"
                    className="shuffleButton"
                    onKeyPress={e => sortPrefOnKey(e.key)}
                    onClick={e => preferredTags()}
                />
            </div>

            <p>{results}</p>
        </div>
    )
}

export default SearchBar
