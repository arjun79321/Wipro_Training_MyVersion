using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalMS.Models;

namespace HospitalMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly EFCoreDbContext _context;

        public PatientsController(EFCoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatient()
        {
            return await _context.Patient.ToListAsync();
        }

        // GET: api/Patients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(int id)
        {
            var patient = await _context.Patient.FindAsync(id);

            if (patient == null)
            {
                return NotFound();
            }

            return patient;
        }

        // GET: api/Patients/byHealthProblem/{healthProblem}
        [HttpGet("byHealthProblem/{healthProblem}")]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatientsByHealthProblem(string healthProblem)
        {
            var patients = await _context.Patient
                .Where(p => p.HealthProblem.Contains(healthProblem))
                .ToListAsync();


            if (patients.Count == 0)
            {
                return NotFound($"No patients found with health problem: {healthProblem}");
            }

            return Ok(patients);
        }

        // GET: api/Patients/byDoctorId/{doctorId}
        [HttpGet("byDoctorId/{doctorId}")]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatientsByDoctorId(int doctorId)
        {
            var patients = await _context.Patient
                .Where(p => p.DoctorId == doctorId)
                .ToListAsync();

            if (patients.Count == 0)
            {
                return NotFound($"No patients found for doctor with ID: {doctorId}");
            }

            return Ok(patients);
        }

        // PUT: api/Patients/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatient(int id, Patient patient)
        {
            if (id != patient.PatientId)
            {
                return BadRequest();
            }

            _context.Entry(patient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientExists(id))
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

        // POST: api/Patients
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Patient>> PostPatient(Patient patient)
        {
            _context.Patient.Add(patient);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPatient", new { id = patient.PatientId }, patient);
        }

        // DELETE: api/Patients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var patient = await _context.Patient.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            _context.Patient.Remove(patient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PatientExists(int id)
        {
            return _context.Patient.Any(e => e.PatientId == id);
        }
    }
}
