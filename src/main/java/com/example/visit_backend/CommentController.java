package com.example.visit_backend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "*")
@RestController //rest api 이용
@RequestMapping("/comments") //함수 안의 코드를 사용하기 위해서는 주소에 필수로 포함되어야함
public class CommentController {
    private final CommentRepository commentRepository;
    @Autowired
    public CommentController(CommentRepository commentRepository) { //레포지토리 파일과 연결
        this.commentRepository = commentRepository;
    }
    @GetMapping
    public List<Comment> list() {
        return this.commentRepository.findAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Comment> getComment(@PathVariable Integer id) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        if (optionalComment.isPresent()) {
            Comment comment = optionalComment.get();
            return new ResponseEntity<>(comment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping // 글 생성
    public ResponseEntity<String> createComment(@RequestBody Comment comment) {
    // 클라이언트에서 전달받은 Comment 객체를 저장하기 전에 createDate를 설정
        comment.setCreateDate(LocalDateTime.now());
    // Comment 객체를 데이터베이스에 저장
        Comment savedComment = commentRepository.save(comment);
        if (savedComment != null) {
            return new ResponseEntity<>("Comment created successfully",
                    HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Failed to create Comment",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}") // 글 수정
    //getmapping과 처리하는 방식이 다르기 때문에 주소가 같아도 무관함
    //post로 구현해도 괜찮지만, 구분을 용이하게 하기 위해 사용
    public ResponseEntity<String> updateComment(@PathVariable Integer id, @RequestBody
    Comment updatedComment) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        if (optionalComment.isPresent()) {
            Comment existingComment = optionalComment.get();
            existingComment.setSubject(updatedComment.getSubject());
            existingComment.setContent(updatedComment.getContent());
            existingComment.setWriter(updatedComment.getWriter());
            // 변경된 Comment 객체를 데이터베이스에 저장
            commentRepository.save(existingComment);
            return new ResponseEntity<>("Comment updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Comment not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Integer id) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        if (optionalComment.isPresent()) {
            commentRepository.deleteById(id);
            return new ResponseEntity<>("Comment deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Comment not found", HttpStatus.NOT_FOUND);
        }
    }
}
