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
    public class categoriasController : ControllerBase
    {
        private readonly ApiBacPruebaContext _context;

        public categoriasController(ApiBacPruebaContext context)
        {
            _context = context;
        }

        // GET: api/categorias
        [HttpGet]
        [EnableCors("MyPolicy")]
        public async Task<ActionResult<IEnumerable<categorias>>> Getcategorias()
        {
            return await _context.categorias.ToListAsync();
        }

        // GET: api/categorias/5
        [HttpGet("{id}")]
        [EnableCors("MyPolicy")]
        public async Task<ActionResult<categorias>> Getcategorias(int id)
        {
            var categorias = await _context.categorias.FindAsync(id);

            if (categorias == null)
            {
                return NotFound();
            }

            return categorias;
        }

        // PUT: api/categorias/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> Putcategorias(int id, categorias categorias)
        {
            if (id != categorias.id_CATEGORIA)
            {
                return BadRequest();
            }

            _context.Entry(categorias).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!categoriasExists(id))
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

        // POST: api/categorias
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [EnableCors("MyPolicy")]
        public async Task<ActionResult<categorias>> Postcategorias(categorias categorias)
        {
            _context.categorias.Add(categorias);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getcategorias", new { id = categorias.id_CATEGORIA }, categorias);
        }

        // DELETE: api/categorias/5
        [HttpDelete("{id}")]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> Deletecategorias(int id)
        {
            var categorias = await _context.categorias.FindAsync(id);
            if (categorias == null)
            {
                return NotFound();
            }

            _context.categorias.Remove(categorias);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool categoriasExists(int id)
        {
            return _context.categorias.Any(e => e.id_CATEGORIA == id);
        }
    }
}
