package org.example.app;

import javax.ws.rs.*;

@Path("tutorial")
public class HelloApplication {
    @GET
    @Path("helloworld")
    public String helloworld() {
        return "Hello World!";
    }
}