package com.portfolio.jrivas.Service;

import com.portfolio.jrivas.Entity.Persona;
import com.portfolio.jrivas.Repository.IPersonaRepository;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ImpPersonaService{
    @Autowired IPersonaRepository ipersonaRepository;
 
     public List<Persona> list(){
         return ipersonaRepository.findAll();
     }
     
     public Optional<Persona> getOne(int id){
         return ipersonaRepository.findById(id);
     }
     
     public Optional<Persona> getByNombre(String nombre){
         return ipersonaRepository.findByNombre(nombre);
     }
     /*guardar y borrar*/
     public void save(Persona persona){
         ipersonaRepository.save(persona);
     }
     
     public void delete(int id){
         ipersonaRepository.deleteById(id);
     }
     /*si existe el objeto que estoy buscando y lo busco por id y por nombre*/
     public boolean existsById(int id){
         return ipersonaRepository.existsById(id);
     }
     
     public boolean existsByNombreE(String nombre){
         return ipersonaRepository.existsByNombre(nombre);
     }
}

