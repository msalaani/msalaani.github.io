package com.demo;
import java.io.*;
import java.util.Random;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Scanner;

@Path("/")
public class HelloWorld
{
    public Random rand = new Random();


    @GET
    @Path("get_rand")
    @Produces(MediaType.APPLICATION_JSON)
    public String get_rand() throws IOException {
        FileWriter outfile = new FileWriter("random.txt");
        //File file = new File("test");
        //System.out.println(file.getAbsolutePath());
        int int_random = rand.nextInt(10);
        outfile.write(String.valueOf(int_random));
        outfile.close();
        JSONObject item = new JSONObject();
        item.put("get_rand", int_random);
        System.out.println(item);
        return "{\"get_rand\":"+int_random+"}";
    }

    @GET
    @Path("verify/{number}")
    @Produces(MediaType.APPLICATION_JSON)
    public String verify(@PathParam("number") final String number) throws IOException {

        FileReader file = new FileReader("random.txt");
        Scanner scf = new Scanner(file);
        int int_random = scf.nextInt();
        scf.close();
        System.out.println(int_random);
        JSONObject item = new JSONObject();
        if (Integer.valueOf(number) == int_random){
            String c = get_rand();
            System.out.println(c);
            return "{\"verify\":"+1+"}";
        }
        return "{\"verify\":"+0+"}";
    }

}
