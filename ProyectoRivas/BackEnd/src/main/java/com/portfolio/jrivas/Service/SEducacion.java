/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.portfolio.jrivas.Service;

import com.portfolio.jrivas.Entity.Educacion;
import com.portfolio.jrivas.Repository.REducacion;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class SEducacion {
    @Autowired
    REducacion rEducacion;
    
    //métodos, me trae lista educación
    public List<Educacion> list(){
        return rEducacion.findAll(); 
    }
    
    public Optional<Educacion> getOne(int id){ //id porque busco por id
        return rEducacion.findById(id);
    }
    
    public Optional<Educacion> getByNmbreE(String nombreE){
        return rEducacion.findByNombreE(nombreE);
    }
    
    public void save(Educacion educacion){
        rEducacion.save(educacion);
    }
    
    public void delete(int id){ //busca por id para borrar
        rEducacion.deleteById(id);
    }
    
    public boolean existsById(int id){
        return rEducacion.existsById(id);
    }
    
    public boolean existsByNombreE(String nombreE){
        return rEducacion.existsByNombreE(nombreE);
    }
}
