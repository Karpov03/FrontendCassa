package com.megatech.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;



@Controller
public class HomeController {


	@RequestMapping(value ={ "/","/login","/logout","/*/*/logout"}, method = RequestMethod.GET)
	public String loginpage() {
		System.out.println("Hi Welcome To Login Page");
		return "login";
	}
		
	@RequestMapping(value ={"/home","/area/*","/home/*","/site/*"}, method = RequestMethod.GET)
	public String sitepage() {
		System.out.println("Hi Welcome to Index Page");
		return "home";
	}
}