package lab.take.backend.repository;

import lab.take.backend.model.Film;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FilmRepository extends JpaRepository<Film, Long> {
    List<Film> findByCategory(String category);
}
