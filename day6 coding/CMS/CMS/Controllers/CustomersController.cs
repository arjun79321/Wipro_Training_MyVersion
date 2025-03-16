using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Models;

namespace CMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return await _context.Customer.ToListAsync();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customer.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.CustId)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            _context.Customer.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomer", new { id = customer.CustId }, customer);
        }

        [HttpGet("/login/{userName}/{passCode}")]
        public async Task<ActionResult<string>> Login(string userName, string passCode)
        {
            Customer? customer = await  _context.Customer.Where(x => x.CustUserName == userName && x.CustPassword == passCode).FirstOrDefaultAsync();
            if (customer != null)
            {
                return "1";
            }
            return "0";

        }

        // GET: api/Customers/username/{userName}
        [HttpGet("username/{userName}")]
        public async Task<ActionResult<Customer>> GetCustomerByUserName(string userName)
        {
            var customer = await _context.Customer
                .Where(c => c.CustUserName == userName)
                .FirstOrDefaultAsync();

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        // GET: api/Customers/withwallet/{custId}
        [HttpGet("withwallet/{custId}")]
        public async Task<ActionResult<object>> GetCustomerWithWallet(int custId)
        {
            var customer = await _context.Customer
                .Where(c => c.CustId == custId)
                .Select(c => new
                {
                    c.CustId,
                    c.CustName,
                    c.CustUserName,
                    c.City,
                    c.State,
                    c.Email,
                    c.MobileNo,
                    Wallets = _context.Wallet.Where(w => w.CustId == c.CustId).ToList()
                })
                .FirstOrDefaultAsync();

            if (customer == null)
            {
                return NotFound("Customer not found");
            }

            return Ok(customer);
        }


        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customer.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customer.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(int id)
        {
            return _context.Customer.Any(e => e.CustId == id);
        }
    }
}
