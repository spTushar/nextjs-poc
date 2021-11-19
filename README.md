## Incremental Static Regeneration Demo

- This is small POC to demonstrate how `ISR` is beneficial to reduce page load time as well as load on the server. 
- Next step is to adapt this pattern inside `studypaq` for `document` pages.

### Steps to re-produce
- Checkout the code
- Start SimpleHTTPServer - `python3 -m http.server`. HTTP Server serves as dummy api server returning `paths.json` - used for dynamic path resolution and `data.json` for `getStaticProps`
- Build the static website - `npm run build`
- Start the server - `npm run start`
- Hit : `http://localhost:3000/posts/six` - This post does not exist in `data.json` and `paths.json`. This should trigger call to api server and render page on the server side and return to client side - This is equivalent to our Server side rendering used with `getServerSideProps`
- Hit : `http://localhost:3000/posts/five`. Note the data. Now Change data for post 'five' in `data.json`  and refresh the URL. It will stay the same. If you refresh again, after few seconds it will start showing new values. Note, it hits API server only once as opposed to `getServerSideProps`. 
- Invalidation is controlled by `revalidate` property. This essentially divides the call to API server from `N` calls to `N/(revalidate)`

## Article Links
- Live Demo - https://nextjs-isr-logrocket.vercel.app/
- Github : https://github.com/idoshamun/nextjs-isr-logrocket/tree/main
- https://blog.logrocket.com/incremental-static-regeneration-with-next-js/