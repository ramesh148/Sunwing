using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using Sunwing.ContactManager.DataModal.Models.Mapping;

namespace Sunwing.ContactManager.DataModal.Models
{
    public partial class ContactManagerContext : DbContext
    {
        static ContactManagerContext()
        {
            Database.SetInitializer<ContactManagerContext>(null);
        }

        public ContactManagerContext()
            : base("Name=ContactManagerContext")
        {
        }

        public DbSet<C__RefactorLog> C__RefactorLog { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new C__RefactorLogMap());
            modelBuilder.Configurations.Add(new CustomerMap());
            modelBuilder.Configurations.Add(new SupplierMap());
        }
    }
}
