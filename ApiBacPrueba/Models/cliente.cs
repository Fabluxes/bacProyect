using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBacPrueba.Models
{
    public class cliente
    {
        
            [Key]
            public int id_CLIENTE { get; set; }

            public string NOMBRE_CLIENTE { get; set; }

            public string EMAIL { get; set; }
           

            
        
    }
}
