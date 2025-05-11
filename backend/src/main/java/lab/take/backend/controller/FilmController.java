package lab.take.backend.controller;

import jakarta.servlet.http.HttpSession;
import lab.take.backend.model.Film;
import lab.take.backend.repository.FilmRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class FilmController {
    private final FilmRepository filmRepository;

    public FilmController(FilmRepository filmRepository) {
        this.filmRepository = filmRepository;
    }

    @GetMapping("/films")
    public List<Film> getAllFilms() {
        return filmRepository.findAll();
    }

    @GetMapping("/films/{category}")
    public List<Film> getFilmsByCategory(@PathVariable String category) {
        return filmRepository.findByCategory(category);
    }

    @PostMapping("/basket/add/{filmId}")
    public ResponseEntity<String> addToBasket(
            @PathVariable Long filmId,
            HttpSession session
    ) {
        if (filmId == null || filmId <= 0) {
            return ResponseEntity.badRequest().body("Incorrect film id");
        }

        Optional<Film> film = filmRepository.findById(filmId);
        if (film.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<Long> basket = Optional.ofNullable(
                (List<Long>) session.getAttribute("basket")
        ).orElse(new ArrayList<>());

        if (!basket.contains(filmId)) {
            basket.add(filmId);
            session.setAttribute("basket", basket);
        }

        return ResponseEntity.ok("Added to basket");
    }

    @GetMapping("/basket")
    public ResponseEntity<List<Film>> getBasket(HttpSession session) {
        List<Long> basketIds = Optional.ofNullable(
                (List<Long>) session.getAttribute("basket")
        ).orElse(Collections.emptyList());

        if (basketIds.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        List<Film> films = filmRepository.findAllById(basketIds);
        return ResponseEntity.ok(films);
    }

    @DeleteMapping("/basket/delete/{filmId}")
    public ResponseEntity<String> deleteFromBasket(
            @PathVariable Long filmId,
            HttpSession session
    ) {
        List<Long> basket = Optional.ofNullable(
                (List<Long>) session.getAttribute("basket")
        ).orElse(new ArrayList<>());

        basket.remove(filmId);
        session.setAttribute("basket", basket);

        return ResponseEntity.ok("Film deleted");
    }

    @GetMapping("/film/{id}")
    public ResponseEntity<Film> getFilmById(@PathVariable Long id) {
        Optional<Film> film = filmRepository.findById(id);
        return film.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
