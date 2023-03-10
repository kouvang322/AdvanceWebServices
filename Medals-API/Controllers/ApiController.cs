using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Medals_API.Models;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.AspNetCore.JsonPatch;

namespace Medals_API.Controllers
{
    [ApiController, Route("[controller]/country")]
    public class ApiController : ControllerBase
    {
        private readonly ILogger<ApiController> _logger;
        private DataContext _dataContext;

        public ApiController(ILogger<ApiController> logger, DataContext db)
        {
            _dataContext = db;
            _logger = logger;
        }
        
        [HttpGet, SwaggerOperation(summary: "return entire collection", null)]
        public IEnumerable<Country> Get()
        {
            return _dataContext.Countries;
        }

        [HttpGet("{id}"), SwaggerOperation(summary: "return specific member of collection", null)]
        public Country Get(int id)
        {
            return _dataContext.Countries.Find(id);
        }
        
        
        [HttpPost, SwaggerOperation(summary: "add member to collection", null), ProducesResponseType(typeof(Country), 201), SwaggerResponse(201, "Created")]
        // add country
        public Country Post([FromBody] Country country) {
            // could check for existing country in database
            // if country already exist throw exception
            return _dataContext.AddCountry(country);
        } 
        
        
        [HttpDelete("{id}"), SwaggerOperation(summary: "delete member from collection", null), ProducesResponseType(typeof(Country), 204), SwaggerResponse(204, "No Content")]
        public ActionResult Delete(int id){
            Country country = _dataContext.Countries.Find(id);
            if (country == null){
                return NotFound();
            }
            _dataContext.DeleteCountry(country);
            return NoContent();
        }

        [HttpPatch("{id}"), SwaggerOperation(summary: "update member from collection", null), ProducesResponseType(typeof(Country), 204), SwaggerResponse(204, "No Content")]
        // update country (specific fields)
        public ActionResult Patch(int id, [FromBody]JsonPatchDocument<Country> patch){
            Country country = _dataContext.Countries.Find(id);
            if (country == null){
                return NotFound();
            }
            _dataContext.PatchCountry(id, patch);
            return NoContent();
        }

        // [HttpPatch("{id}"), SwaggerOperation(summary: "update member from collection", null), ProducesResponseType(typeof(Country), 204), SwaggerResponse(204, "No Content")]
        // public ActionResult Patch(int id){
            
        //     {
                
        //     }
        //     return NoContent();
        // }
    }
}