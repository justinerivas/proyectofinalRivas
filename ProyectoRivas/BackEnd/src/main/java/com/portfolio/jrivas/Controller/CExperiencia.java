/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.portfolio.jrivas.Controller;

import com.portfolio.jrivas.Dto.dtoExperiencia;
import com.portfolio.jrivas.Entity.Experiencia;
import com.portfolio.jrivas.Security.Controller.Mensaje;
import com.portfolio.jrivas.Service.SExperiencia;
import java.util.List;
import org.apache.commons.lang3.StringUtils; //es la que yo puse en dependencies
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/explab")
//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins = "https://ftdjustine.web.app") 
public class CExperiencia {
    @Autowired
    SExperiencia sExperiencia;
    //lista que me va a traer todas las experiencias. Trae el método list
    @GetMapping("/lista")
    public ResponseEntity<List<Experiencia>> list(){
        List<Experiencia> list = sExperiencia.list(); //variable que contiene la lista
        return new ResponseEntity(list, HttpStatus.OK); //devuelve la lista con un status ok
    }
    
    @GetMapping("/detail/{id}")
    public ResponseEntity<Experiencia> getById(@PathVariable("id") int id){
        if(!sExperiencia.existsById(id))
            return new ResponseEntity(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        Experiencia experiencia = sExperiencia.getOne(id).get();
        return new ResponseEntity(experiencia, HttpStatus.OK);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id) {
        //Veo si existe el ID - si no existe, devuelve el mje el id no existe
        if (!sExperiencia.existsById(id)) {
            return new ResponseEntity(new Mensaje("El ID de la experiencia no existe"), HttpStatus.NOT_FOUND);
        } //Si existe llamo al service y lo borra por ID
        sExperiencia.delete(id);
        return new ResponseEntity(new Mensaje("Experiencia eliminada"), HttpStatus.OK);
    }

    
    @PostMapping("/create") //creo una nueva experiencia
    public ResponseEntity<?> create(@RequestBody dtoExperiencia dtoexp){      //toma los datos del body y puede tomar
        if(StringUtils.isBlank(dtoexp.getNombreE())) //validación - para esto es lo de la dependencia pom.xml
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        if(sExperiencia.existsByNombreE(dtoexp.getNombreE())) //si el campo es blanco muestra el mje que el nombre es obligatorio
            return new ResponseEntity(new Mensaje("Esa experiencia ya existe"), HttpStatus.BAD_REQUEST); //Si ya puse esa experiencia me dice que ya estaba y no la puede repetir
        
        Experiencia experiencia = new Experiencia(dtoexp.getNombreE(), dtoexp.getDescripcionE()); //Si todo lo anterior se cumple, me agrega la nueva experiencia
        sExperiencia.save(experiencia);
        
        return new ResponseEntity(new Mensaje("Experiencia agregada"), HttpStatus.OK);
    }
    
    @PutMapping("/update/{id}") //actualizar datos - modifica uno que está en un id en particular
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody dtoExperiencia dtoexp){
        //Veo si existe el ID - si no existe, devuelve el mje el id no existe
        if(!sExperiencia.existsById(id)) 
            return new ResponseEntity(new Mensaje("El ID no existe"), HttpStatus.BAD_REQUEST);
        //Comparo el nombre de la experiencia con el dto llamando al service getnombreE. Tiene que ser distinto de id. Si se cumple, devuelve el mensaje que ya existe.
        if(sExperiencia.existsByNombreE(dtoexp.getNombreE()) && sExperiencia.getByNombreE(dtoexp.getNombreE()).get().getId() != id)
            return new ResponseEntity(new Mensaje("Esa experiencia ya existe"), HttpStatus.BAD_REQUEST);
        //No puede estar vacio
        if(StringUtils.isBlank(dtoexp.getNombreE())) //no puede estar en blanco el campo nombre
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        //si está completo setea nombre y descripción
        Experiencia experiencia = sExperiencia.getOne(id).get();
        experiencia.setNombreE(dtoexp.getNombreE());
        experiencia.setDescripcionE((dtoexp.getDescripcionE()));
        
        sExperiencia.save(experiencia);
        return new ResponseEntity(new Mensaje("Experiencia actualizada"), HttpStatus.OK);
             
    }
}