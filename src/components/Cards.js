import React, {useContext, useState} from "react"
import {newsContext} from "../context/NewsContext"
import NewsBox from './NewsBox'
import {CardsRowStyled} from './StyledCards'
import Spinner from './containers/Spinner'
import Pagination from './containers/Pagination'

const Cards = () => {
    const {news} = useContext(newsContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(15);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = news ? news.slice(indexOfFirstPost, indexOfLastPost) : null;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            {currentPosts ?
                <>
                     <div className='border-l-5 mb-2 text-success font-bold p-2 uppercase custom-text-header-box'>
                         <p>Verified News</p>
                     </div>
                    <CardsRowStyled>

                        {

                            currentPosts.map(article => (

                                    <NewsBox key={article.id} article={article}/>
                                )
                            )

                        }
                    </CardsRowStyled>


                    <Pagination postPerPage={postPerPage} totalPost={news.length} currentPage={currentPage} paginate={paginate}/>
                </>


                : <Spinner />
            }
        </>
    )

};

export default Cards
