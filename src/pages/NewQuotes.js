import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import QuoteForm from '../components/quotes/QuoteForm'
import useHttp from '../hooks/use-http'
import { addQuote } from '../lib/api.js'

const NewQuotes = () => {
    const { sendRequest, status } = useHttp(addQuote);
    const history = useHistory()

    useEffect(() => {
        if (status === 'completed') {
            history.push('/quotes')
        }
    }, [status, history])


    const addNewQuoteHandler = (myQuote) => {
        sendRequest(myQuote)
    } 

    return (
        <QuoteForm onAddQuote={addNewQuoteHandler} isLoading={status === 'pending'} />
    )
}

export default NewQuotes;