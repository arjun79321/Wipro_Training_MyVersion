using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.JsonPatch;
using System.Linq;
using System.Threading.Tasks;
using EmployeeProject.Models;

namespace EmployeeProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EFCoreDbContext _context;

        public EmployeeController(EFCoreDbContext context)
        {
            _context = context;
        }

        

        [HttpGet("GetEmployeeWithManager/{id}")]
        public async Task<ActionResult<object>> GetEmployeeWithManager(int id)
        {
            var employee = await _context.Employee
                .Include(e => e.Manager)  // Fetch manager details (Self-join)
                .FirstOrDefaultAsync(e => e.EmpId == id);

            if (employee == null)
            {
                return NotFound(new { message = "Employee not found" });
            }

            // *Return both employee and manager details*
            var response = new
            {
                EmployeeDetails = new
                {
                    EmployeeId = employee.EmpId,
                    EmployeeName = employee.EmployName,
                    LeaveAvailable = employee.LeaveAvail,
                    DateOfBirth = employee.DateOfBirth,
                    Email = employee.Email,
                    Mobile = employee.Mobile
                },
                ManagerDetails = employee.Manager != null ? new
                {
                    ManagerId = employee.Manager.EmpId,
                    ManagerName = employee.Manager.EmployName,
                    Email = employee.Manager.Email,
                    Mobile = employee.Manager.Mobile
                } : null
            };

            return Ok(response);
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employee.Include(e => e.Manager).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employee.Include(e => e.Manager).FirstOrDefaultAsync(e => e.EmpId == id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        [HttpGet("PendingSubordinates/{mgrId}")]
public async Task<ActionResult<IEnumerable<LeaveHistory>>> GetPendingLeavesForSubordinates(int mgrId)
{
    // Get all employees who have the given managerId
    var subordinates = await _context.Employee
                                     .AsNoTracking()
                                     .Where(e => e.MgrId == mgrId)
                                     .Select(e => e.EmpId)
                                     .ToListAsync();

    if (!subordinates.Any())
    {
        return NotFound($"No subordinates found for Manager ID {mgrId}");
    }

    // Fetch pending leave requests for subordinates
    var pendingLeaves = await _context.LeaveHistory
                                      .AsNoTracking()
                                      .Where(lh => subordinates.Contains(lh.EmpId) && lh.LeaveStatus == "PENDING")
                                      .ToListAsync();

    return pendingLeaves;
}

        [HttpPost]
        public async Task<ActionResult<Employee>> AddEmployee(Employee employee)
        {
            _context.Employee.Add(employee);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.EmpId }, employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.EmpId)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("UpdateLeaveAvail/{id}/{leaveAvail}")]
public async Task<IActionResult> UpdateLeaveAvail(int id, int leaveAvail)
{
    var sql = "UPDATE Employee SET LeaveAvail = {0} WHERE EmpId = {1}";
    
    int rowsAffected = await _context.Database.ExecuteSqlRawAsync(sql, leaveAvail, id);

    if (rowsAffected == 0)
    {
        return NotFound(new { message = "Employee not found or no changes made" });
    }

    return Ok(new { message = "LeaveAvail updated successfully", id, leaveAvail });
}



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employee.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}