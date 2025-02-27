const router = require("express").Router();

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

router.get('/', (req, res) => {
    Movie
        .find()
        .populate('cast')
        .then((movies) => res.render('movies/movies', { movies }))
})

router.get('/create', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render('movies/new-movie', { celebrities })
        })

})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log('An error occurred creating a new movie', err))

})

router.get('/:id', (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params
    Movie
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log('An error occurred trying to delete the movie', err))
})


router.get('/:id/edit', (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .then((movie) => {
            Celebrity
                .find()
                .then((celebrities) => {
                    res.render('movies/edit-movie', { movie, celebrities })
                })
        }
        )
})

router.post('/:id/edit', (req, res) => {
    const { title, genre, plot, cast } = req.body
    const { id } = req.params
    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
})


module.exports = router;