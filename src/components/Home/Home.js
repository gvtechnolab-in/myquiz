import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIBaseUrl, APIusername, APIpassword } from "../../config";

const catItems = {
  _items: [
    /*  {
        "_id": "61ba7a0534b9766caf448f0c",
        "name": "math.calculus.limits",
        "_updated": "Wed, 15 Dec 2021 23:28:05 GMT",
        "_created": "Wed, 15 Dec 2021 23:28:05 GMT",
        "_links": {
            "self": {
            "title": "Tag",
            "href": "/v1/tags/61ba7a0534b9766caf448f0c"
          }
        }
      },
      {
        "_id": "61ba7a2f34b9766caf448f0e",
        "name": "math.trigonometry",
        "_updated": "Wed, 15 Dec 2021 23:28:47 GMT",
        "_created": "Wed, 15 Dec 2021 23:28:47 GMT",
        "_links": {
          "self": {
            "title": "Tag",
            "href": "/v1/tags/61ba7a2f34b9766caf448f0e"
          }
        }
      }*/
  ],
  /*"_links": {
      "parent": {
        "title": "home",
        "href": "/"
      },
      "self": {
        "title": "/v1/tags",
        "href": "v1/tags"
      }
    },
    "_meta": {
      "page": 1,
      "max_results": 1000,
      "total": 3
    }*/
};

function Home(props) {
  const [selectedCat, setSelectedCat] = useState("");
  const [categories, setCategories] = useState(catItems?._items);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      fetch(APIBaseUrl + "api/v1/tags", {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          // 'Authorization': 'Basic ' + btoa(`${APIusername}:${APIpassword}`),
          // 'content-type':' application/json',
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          setLoading(false);
          setCategories(response?._items);
        });
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  }, []);
  return (
    <div className="p-3">
      <div className="box border-2 text-center max-w-xs mt-2 mx-auto">
        {loading === true ? (
          "Loading..."
        ) : (
          <>
            <h2>Tags</h2>
            {categories?.length > 0 &&
              categories?.map((item, index) => {
                return (
                  <label
                    onClick={() => setSelectedCat(item)}
                    className={`list-item-label cursor-pointer block ${
                      selectedCat._id === item._id
                        ? "bg-indigo-600 text-white"
                        : ""
                    }`}
                  >
                    {item.name}
                  </label>
                );
              })}
          </>
        )}
      </div>
      <div className="box p-3 text-center">
        <Link
          to={`/questions/${selectedCat?.name ? selectedCat?.name : ''}`}
          className="px-6 py-2 text-sm button bg-indigo-500 text-white rounded-lg outline-none hover:bg-indigo-600 ring-indigo-300"
        >
          Start
        </Link>
      </div>
    </div>
  );
}

export default Home;
