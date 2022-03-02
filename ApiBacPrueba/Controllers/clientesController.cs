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
    public class clientesController : ControllerBase
    {
        private readonly ApiBacPruebaContext _context;

        public clientesController(ApiBacPruebaContext context)
        {
            _context = context;
        }

        // GET: api/clientes
        [HttpGet]
        [EnableCors("MyPolicy")]
        public async Task<ActionResult<IEnumerable<cliente>>> Getcliente()
        {
            return await _context.cliente.ToListAsync();
        }

        // GET: api/clientes/5
        [HttpGet("{id}")]
        [EnableCors("MyPolicy")]
        public async Task<ActionResult<cliente>> Getcliente(int id)
        {
            var cliente = await _context.cliente.FindAsync(id);

            if (cliente == null)
            {
                return NotFound();
            }

            return cliente;
        }

        // PUT: api/clientes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> Putcliente(int id, cliente cliente)
        {
            if (id != cliente.id_CLIENTE)
            {
                return BadRequest();
            }

            _context.Entry(cliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!clienteExists(id))
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

        // POST: api/clientes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [EnableCors("MyPolicy")]
        public async Task<ActionResult<cliente>> Postcliente(cliente cliente)
        {
            _context.cliente.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getcliente", new { id = cliente.id_CLIENTE }, cliente);
        }

        // DELETE: api/clientes/5
        [HttpDelete("{id}")]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> Deletecliente(int id)
        {
            var cliente = await _context.cliente.FindAsync(id);
            if (cliente == null)
            {
                return NotFound();
            }

            _context.cliente.Remove(cliente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool clienteExists(int id)
        {
            return _context.cliente.Any(e => e.id_CLIENTE == id);
        }
    }
}
