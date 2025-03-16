using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankProject.Models;

namespace BankProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly EFCoreDbContext _context;

        public AccountsController(EFCoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Accounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            return await _context.Accounts.ToListAsync();
        }

        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(int id)
        {
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        // PUT: api/Accounts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount(int id, Account account)
        {
            if (id != account.AccountNo)
            {
                return BadRequest();
            }

            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
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

        // POST: api/Accounts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {
            int accountNo = _context.Accounts.Max(x => x.AccountNo);
            accountNo++;
            account.AccountNo = accountNo;
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAccount", new { id = account.AccountNo }, account);
        }

        [HttpPost("/deposit/{accountNo}/{tranAmount}")]
        public async Task<ActionResult<string>> DepositAccount(int accountNo, decimal tranAmount)
        {
            Account? account = _context.Accounts.Where(x => x.AccountNo == accountNo).FirstOrDefault();

            account.Amount = account.Amount + tranAmount;
            //_context.SaveChanges();
            Trans trans = new Trans();
            trans.AccountNo = accountNo;
            trans.TranAmount = tranAmount;
            trans.TranType = "C";
            _context.Trans.Add(trans);
            await _context.SaveChangesAsync();
            return "Amount Credited...";

        }

        [HttpPost("/withdraw/{accountNo}/{tranAmount}")]
        public async Task<ActionResult<string>> WithdrawAccount(int accountNo, decimal tranAmount)
        {
            Account? account = _context.Accounts.Where(x => x.AccountNo == accountNo).FirstOrDefault();
            if (account.Amount - tranAmount > 0)
            {
                account.Amount = account.Amount - tranAmount;
                //_context.SaveChanges();
                Trans trans = new Trans();
                trans.AccountNo = accountNo;
                trans.TranAmount = tranAmount;
                trans.TranType = "D";
                _context.Trans.Add(trans);
                await _context.SaveChangesAsync();
                return "Amount Debited...";
            }
            return "Insufficient Funds";
        }

        [HttpGet("/login/{userName}/{passCode}")]
        public async Task<ActionResult<string>> Login(string userName, string passCode)
        {
            Users? user = _context.Users.Where(x => x.Username == userName && x.Passcode == passCode).FirstOrDefault();
            if (user != null)
            {
                return "1";
            }
            return "0";

        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountExists(int id)
        {
            return _context.Accounts.Any(e => e.AccountNo == id);
        }
    }
}
