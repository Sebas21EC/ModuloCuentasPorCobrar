using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccountsReceivableModule.Models.BankAccount;
    
    public record BankAccountId
    {
        public string Value { get; }

        public BankAccountId(string value)
        {
            Value = value;
        }

        public static BankAccountId Create()
        {
            // Formato: CTA-BAN-XXX
            string formattedId = $"CTA-BAN-{GetNextId():D3}";
            return new BankAccountId(formattedId);
        }
        public static BankAccountId Create(string value)
        {
            BankAccountId bankAccountId = new BankAccountId(value);            
            return bankAccountId;
        }

        private static int GetNextId()
        {
            // Lógica para obtener el siguiente número de cuenta bancaria
            // Puedes implementar lógica personalizada aquí, como consultar la base de datos
            // o mantener un contador en algún lugar.
            // Este es solo un ejemplo simple.
            // En una aplicación real, deberías manejar esto de manera más robusta.
            // Aquí, solo devuelvo un número aleatorio para demostrar el concepto.
            return new Random().Next(1, 1000);
        }
    }
