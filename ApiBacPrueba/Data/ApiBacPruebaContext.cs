using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ApiBacPrueba.Models;

namespace ApiBacPrueba.Data
{
    public class ApiBacPruebaContext : DbContext
    {
        public ApiBacPruebaContext (DbContextOptions<ApiBacPruebaContext> options)
            : base(options)
        {
        }

        public DbSet<ApiBacPrueba.Models.productos> productos { get; set; }

        public DbSet<ApiBacPrueba.Models.cliente> cliente { get; set; }

        public DbSet<ApiBacPrueba.Models.categorias> categorias { get; set; }
    }
}
