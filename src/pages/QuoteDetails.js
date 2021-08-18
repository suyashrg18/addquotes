import { Fragment, useEffect } from "react";
import { useParams, Route, Link } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from '../lib/api'
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import NoQuotesFound from '../components/quotes/NoQuotesFound'

const QuoteDetails = () => {
    const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);
    const params = useParams()
    const { quoteid } = params;
    
    useEffect(() => {
        sendRequest(quoteid)
    }, [sendRequest, quoteid])



    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        )
    }

    if (error) {
        return (
            <div className='centered focused'><p>Error in fetching quotes</p></div>
        )
    }

    if (!loadedQuote.text) {
        return <NoQuotesFound />
    }

    return (
        <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
            <Route path={`/quotes/${quoteid}`} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`/quotes/${quoteid}/comments`}>Load Comments</Link>
                </div>
            </Route>
            <Route path={`/quotes/${quoteid}/comments`}>
                <Comments />
            </Route>

        </Fragment>

    )
}

export default QuoteDetails;