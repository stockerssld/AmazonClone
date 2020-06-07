const router = require('express').Router()

const algoliasearch = require('algoliasearch')

const client = algoliasearch('8YPSG6XWED','5b908e163b505c4c92f349ab8294af8b')
const index = client.initIndex('Amazono1')

router.get('/', (req, res, next) => {
    if (req.query.query) {
        index.search('products',
        {
            query: req.query.query,
            page: req.query.page
        })
        .then( content=>
            res.json({
                success: true,
                message: "Here is your search",
                status: 200,
                content: content,
                search_result: req.query.query
            })
        
        )
    }
})

// https://www.algolia.com/doc/api-reference/api-methods/search/
  
module.exports = router;
  
  