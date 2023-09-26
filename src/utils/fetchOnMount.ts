import axios from 'axios'
import { useEffect, useState } from 'react'
import { getStoredToken } from './protectedRouteHandler'

/**
 * Custom hook for axios to fetch raw file content on component mount
 * @param fetchUrl The URL pointing to the raw file content
 * @param path The path of the file, used for determining whether path is protected
 */
export default function useFileContent(
  fetchUrl: string,
  path: string
): { response: any; error: string; validating: boolean } {
  const [response, setResponse] = useState('')
  const [validating, setValidating] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const hashedToken = getStoredToken(path)
    const url = fetchUrl + (hashedToken ? `&odpt=${hashedToken}` : '')

    axios
      // Using 'blob' as response type to get the response as a raw file blob, which is later parsed as a string.
      // Axios defaults response parsing to JSON, which causes issues when parsing JSON files.
      .get(url, { responseType: 'blob' })
      .then(async res => setResponse(await res.data.text()))
      .catch(e => setError(e.message))
      .finally(() => setValidating(false))
  }, [fetchUrl, path])
  return { response, error, validating }
}




// import axios from 'axios'
// import { useEffect } from 'react'
// import { getStoredToken } from './protectedRouteHandler'
// import { setResponse, setError, setValidating } from '../redux/features/fetchOnMountSlice';
// import { RootState, useAppDispatch, useAppSelector  } from '../redux/store'

// export default function useFileContent(fetchUrl: string, path: string) {
//   const dispatch = useAppDispatch();
// const response = useAppSelector((state:RootState)=>state.fileContent.response)
// const error = useAppSelector((state:RootState)=>state.fileContent.error)
// const validating = useAppSelector((state:RootState)=>state.fileContent.validating)
//   useEffect(() => {
//     const hashedToken = getStoredToken(path)
//     const url = fetchUrl + (hashedToken ? `&odpt=${hashedToken}` : '')

//     axios
//       .get(url, { responseType: 'blob' })
//       .then(async res => dispatch(setResponse(await res.data.text())))
//       .catch(e => dispatch(setError(e.message)))
//       .finally(() => dispatch(setValidating(false)))
//   }, [fetchUrl, path])
  
//   return { response, error, validating }
// }
