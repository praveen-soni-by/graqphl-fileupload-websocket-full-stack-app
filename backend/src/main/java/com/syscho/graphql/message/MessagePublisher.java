package com.syscho.graphql.message;

import com.netflix.dgs.codgen.generated.types.FileStatus;
import com.netflix.dgs.codgen.generated.types.Message;
import com.netflix.graphql.dgs.DgsComponent;
import org.reactivestreams.Publisher;
import reactor.core.publisher.ConnectableFlux;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

import javax.annotation.PostConstruct;

@DgsComponent
public class MessagePublisher {

    private FluxSink<FileStatus> stream;
    private ConnectableFlux<FileStatus> publisher;
    private FluxSink<Message> streamMessage;
    private ConnectableFlux<Message> publisherMessage;
    @PostConstruct
    public void init() {
        Flux<FileStatus> publisher = Flux.create(emitter -> {
            stream = emitter;
        });

        this.publisher = publisher.publish();
        this.publisher.connect();

        Flux<Message> publisher1 = Flux.create(emitter -> {
            streamMessage = emitter;
        });

        this.publisherMessage = publisher1.publish();
        this.publisherMessage.connect();
    }

    public void publish(FileStatus data) {
        stream.next(data);
    }
    public void publish(Message message) {
        streamMessage.next(message);
    }

    public Publisher<FileStatus> subscribe() {
        return publisher;
    }

    public Publisher<Message> subscribeMessage() {
        return publisherMessage;
    }
}
