using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBacPrueba.Models
{
    public class productos
    {
        [Key]
        public int id_PRODUCTOS { get; set; }

        public string NOMBRE_PRODUCTO { get; set; }

        public string DETALLE_PRODUCTO { get; set; }
        public string LINKIMAGEN_PRODUCTO { get; set; }

        [Required]
        public int type_iD { get; set; }
    }
}
