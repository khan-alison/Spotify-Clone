import React, {useEffect, useState} from "react";
import style from "./SearchRecommendation.module.css"
import {spotifyApi} from "../../../../spotify/api";
import Genres from "../../../items/genres_items/GenresItems";

export default function SearchRecommendation(){
    const [categories, setCategories] = useState([]);
    const bgColorCode = ["#26856B", "#1E3264", "#8D67AB", "#E8105B","#C3F0C8", "#158A06", "#477D94", "#FF6437","#26856B", "#1E3264", "#8D67AB", "#E8105B","#C3F0C8", "#158A06", "#477D94", "#FF6437","#26856B", "#1E3264", "#8D67AB", "#E8105B","#C3F0C8", "#158A06", "#477D94", "#FF6437",];
    useEffect(() => {
        spotifyApi
            .getCategories({
                limit: 20,
                offset: 0,
                country: "US",
                locale: "sv_SE",
            })
            .then(
                function (data: any) {
                    const filteredCategories = data.body.categories.items.filter(
                        (item: any, ind: number) => ind !== 0
                    );
                    setCategories(filteredCategories);
                },
                function (err: Error) {
                    console.log("Something went wrong!", err);
                }
            );
    }, []);

    return (
        <div className={style.recommend}>
            <h4>Your top genres</h4>
            <div className={style.genres}>
                {categories.map((item: any, ind: number) => (
                    <Genres
                        title={item.name}
                        icon={item.icons[0].url}
                        key={ind}
                        bgColor={bgColorCode[ind]}
                    />
                ))}
            </div>
        </div>
    );
}