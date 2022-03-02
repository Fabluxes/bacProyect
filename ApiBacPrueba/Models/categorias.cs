using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBacPrueba.Models
{
    public class categorias
    {
        [Key]
        public int id_CATEGORIA { get; set; }

        public string CATEGORIA { get; set; }

       
    }
}
