import axios from 'axios';
const baseUrl = 'https://test-api.byte.city';
const url = baseUrl+'/nftdata/show'

exports.handler = async (event, context) => {
  /*
   * Generate HTTP response using 200 status code with a simple body.
   */
  const request = event.Records[0].cf.request
  const headers = request.headers;
  const params = request.params;
  const contentType = headers['Content-Type'];
  
  if (/json/.test(contentType)) {
    console.log("json Content-Type detected:", contentType);
    axios
      .post(url, {
        TokenId: parseInt(params.id),
        Market: params.chain,
        Series: params.type
      })
      .then((response) => { return(response.data.data); })
      .catch(() => { return({
        success: false,
        error: "Metadata not found"
      });
    });
  } 
  console.log("non json Content-Type detected:", contentType);
  return;
};
