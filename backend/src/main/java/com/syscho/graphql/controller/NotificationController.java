package com.syscho.graphql.controller;

import com.netflix.dgs.codgen.generated.types.Message;
import com.syscho.graphql.message.MessagePublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;


/**
 * The type Notification controller.
 * To Request for notification
 */
@RestController

@CrossOrigin("*")
public class NotificationController {

    @Autowired
    private MessagePublisher messagePublisher;

    @GetMapping("/notification/{msg}")
    public String sendNotificaton(@PathVariable("msg") String message, HttpServletRequest httpServletRequest) {
        System.out.println("sending notification");
        Message messages = Message.newBuilder().message(message).timeStamp(LocalDate.now()).build();
        messagePublisher.publish(messages);
        return "success";
    }
}
