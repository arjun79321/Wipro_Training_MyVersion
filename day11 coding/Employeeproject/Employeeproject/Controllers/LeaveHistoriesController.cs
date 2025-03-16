using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeProject.Models;

namespace EmployeeProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveHistoriesController : ControllerBase
    {
        private readonly EFCoreDbContext _context;

        public LeaveHistoriesController(EFCoreDbContext context)
        {
            _context = context;
        }

        // GET: api/LeaveHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeaveHistory>>> GetLeaveHistory()
        {
            return await _context.LeaveHistory.ToListAsync();
        }

        // GET: api/LeaveHistories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LeaveHistory>> GetLeaveHistory(int id)
        {
            var leaveHistory = await _context.LeaveHistory.FindAsync(id);

            if (leaveHistory == null)
            {
                return NotFound();
            }

            return leaveHistory;
        }
       
       // GET: api/LeaveHistories/employee/5
[HttpGet("employee/{empId}")]
public async Task<ActionResult<IEnumerable<LeaveHistory>>> GetLeaveHistoryByEmpId(int empId)
{
    var leaveHistories = await _context.LeaveHistory
                                       .Where(lh => lh.EmpId == empId)
                                       .ToListAsync();

    if (leaveHistories == null || leaveHistories.Count == 0)
    {
        return NotFound();
    }

    return leaveHistories;
}

        // PUT: api/LeaveHistories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLeaveHistory(int id, LeaveHistory leaveHistory)
        {
            if (id != leaveHistory.LeaveId)
            {
                return BadRequest();
            }

            _context.Entry(leaveHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeaveHistoryExists(id))
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

        // POST: api/LeaveHistories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LeaveHistory>> PostLeaveHistory(LeaveHistory leaveHistory)
        {
            _context.LeaveHistory.Add(leaveHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLeaveHistory", new { id = leaveHistory.LeaveId }, leaveHistory);
        }

        // DELETE: api/LeaveHistories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLeaveHistory(int id)
        {
            var leaveHistory = await _context.LeaveHistory.FindAsync(id);
            if (leaveHistory == null)
            {
                return NotFound();
            }

            _context.LeaveHistory.Remove(leaveHistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LeaveHistoryExists(int id)
        {
            return _context.LeaveHistory.Any(e => e.LeaveId == id);
        }
    }
}