using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiBacPrueba.Data;
using ApiBacPrueba.Models;
using Microsoft.AspNetCore.Cors;

namespace ApiBacPrueba.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicy")]
    public class productosController : ControllerBase
    {
        private readonly ApiBacPruebaContext _context;

        public productosController(ApiBacPruebaContext context)
        {
            _context = context;
        }

        // GET: api/productos
        [HttpGet]
        [EnableCors("MyPolicy")]
        public async Task<ActionResult<IEnumerable<productos>>> Getproductos()
        {
            return await _context.productos.ToListAsync();
        }

        // GET: api/productos/5
        [HttpGet("{id}")]
        [EnableCors("MyPolicy")]
        public async Task<ActionResult<productos>> Getproductos(int id)
        {
            var productos = await _context.productos.FindAsync(id);

            if (productos == null)
            {
                return NotFound();
            }

            return productos;
        }

        // PUT: api/productos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> Putproductos(int id, productos productos)
        {
            if (id != productos.id_PRODUCTOS)
            {
                return BadRequest();
            }

            _context.Entry(productos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!productosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/productos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [EnableCors("MyPolicy")]
        public async Task<ActionResult<productos>> Postproductos(productos productos)
        {
            _context.productos.Add(productos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getproductos", new { id = productos.id_PRODUCTOS }, productos);
        }

        // DELETE: api/productos/5
        [HttpDelete("{id}")]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> Deleteproductos(int id)
        {
            var productos = await _context.productos.FindAsync(id);
            if (productos == null)
            {
                return NotFound();
            }

            _context.productos.Remove(productos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool productosExists(int id)
        {
            return _context.productos.Any(e => e.id_PRODUCTOS == id);
        }
    }
}
