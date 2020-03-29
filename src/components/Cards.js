import React, {useContext, useState} from "react"
import {newsContext} from "../context/NewsContext"
import NewsBox from './NewsBox'
import {CardsRowStyled} from './StyledCards'
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from './containers/Pagination'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50vh',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        }
    },

}));

const Cards = () => {
    const {news, loading} = useContext(newsContext);
    const classes = useStyles();
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostsperPage] = useState(15);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = news ? news.slice(indexOfFirstPost, indexOfLastPost) : null;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            {currentPosts ?
                <>
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


                : <div className={classes.root}><CircularProgress/></div>
            }
        </>
    )

};

export default Cards
