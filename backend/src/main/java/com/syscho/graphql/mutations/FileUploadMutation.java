package com.syscho.graphql.mutations;

import com.netflix.dgs.codgen.generated.DgsConstants;
import com.netflix.dgs.codgen.generated.types.FileStatus;
import com.netflix.dgs.codgen.generated.types.Message;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.DgsSubscription;
import com.syscho.graphql.message.MessagePublisher;
import graphql.schema.DataFetchingEnvironment;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;


@Validated
@DgsComponent
public class FileUploadMutation {

    @Autowired
    private MessagePublisher messagePublisher;

    @DgsMutation(field = DgsConstants.MUTATION.UploadFile)
    public boolean uploadFile(DataFetchingEnvironment dfe) throws IOException, InterruptedException {
        MultipartFile file = dfe.getArgument("file");
        String content = new String(file.getBytes());
        Thread.sleep(2000);
        publishEvent(file);
        return !content.isEmpty();
    }

    private void publishEvent(MultipartFile file) {
        Mono.just("data")
                .delayElement(Duration.ofSeconds(5))
                .subscribe((data) -> {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
                    FileStatus fileStatus = FileStatus.newBuilder().fileName(file.getOriginalFilename()).message("File processed successfully")
                            .id(UUID.randomUUID().toString())
                            .timeStamp(LocalDateTime.now().format(formatter))
                            .build();
                    messagePublisher.publish(fileStatus);
                    System.out.println("executed done");
                });
    }

    @DgsSubscription
    public Publisher<FileStatus> status() {
        return messagePublisher.subscribe();
    }

    @DgsSubscription
    public Publisher<Message> message() {
        return messagePublisher.subscribeMessage();
    }
}
