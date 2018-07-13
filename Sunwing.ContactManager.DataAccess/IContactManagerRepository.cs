using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sunwing.ContactManager.DataAccess
{
    public interface IContactManagerRepository<TEntity>
    where TEntity: class
    {
        IEnumerable<TEntity> Get();
        TEntity GetById(object Id);
        TEntity Insert(TEntity entity);
        TEntity Update(TEntity entity);
        void Delete(object Id);
        void Delete(TEntity entityToDelete);
    }
}
