package com.megatech.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;



@Controller
public class HomeController {


	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String hellopage() {
		System.out.println("Hi Welcome");
		return "home";
	}
}