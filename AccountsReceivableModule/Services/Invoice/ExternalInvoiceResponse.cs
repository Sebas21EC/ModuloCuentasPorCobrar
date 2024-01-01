using AccountsReceivableModule.Models;
using Newtonsoft.Json;

namespace AccountsReceivableModule.Services;


//    EJEMPLO API GET INVOICES
//    {
//"message": "Success",
//"invoices": [
//{
//"head_id": "XXX-CCS-E",
//"customer": {
//"cus_dni": "1005245236",
//"cus_name": "Viviana Cuaspa",
//"cus_is_credit": false,
//"cus_birthdate": "2001-08-24",
//"cus_address": "Av. 13 de Abril",
//"cus_phone": "0969396110",
//"cus_email": "vivi@gmail.com",
//"cus_status": true
//},
//"head_date": "2023-12-28",
//"iva_rate": 12.0,
//"payt_name": "6-credito",
//"created_at": "2023-12-28T11:03:53Z",
//"updated_at": "2023-12-28T11:03:56Z",
//"details": [
//{
//"det_id": 1,
//"det_product_id": 1,
//"det_quantity": 3,
//"det_total_amount": 6.0,
//"det_product_name": "pizza",
//"det_product_price": 2.0,
//"det_included_iva": true,
//"det_iva": 12.0,
//"head_id_id": "XXX-CCS-E",
//"created_at": "2023-12-28T11:17:06Z",
//"updated_at": "2023-12-28T11:17:09Z"
//},
//{
//    "det_id": 3,
//"det_product_id": 1,
//"det_quantity": 3,
//"det_total_amount": 6.0,
//"det_product_name": "mermelada",
//"det_product_price": 2.0,
//"det_included_iva": true,
//"det_iva": 12.0,
//"head_id_id": "XXX-CCS-E",
//"created_at": "2023-12-28T11:17:06Z",
//"updated_at": "2023-12-28T11:17:09Z"
//}
//]
//}
//]
//}
public class ExternalInvoiceResponse
{

    [JsonProperty("message")]
    public string? Message { get; set; }

    [JsonProperty("invoices")]
    public List<ExternalInvoice>? Invoices { get; set; }

}

public class ExternalInvoice
{
    [JsonProperty("head_id")]
    public string? InvoiceId { get; set; }

    [JsonProperty("customer")]
    public ExternalCustomer? Customer { get; set; }

    [JsonProperty("head_date")]
    public DateTime HeadDate { get; set; }

    [JsonProperty("iva_rate")]
    public decimal IvaRate { get; set; }

    [JsonProperty("payt_name")]
    public string? PaytName { get; set; }

    [JsonProperty("details")]
    public List<ExternalInvoiceDetail>? Details { get; set; }
}

public class ExternalCustomer
{
    [JsonProperty("cus_dni")]
    public string? CustomerId { get; set; }

    [JsonProperty("cus_name")]
    public string? CustomerName { get; set; }

    [JsonProperty("cus_is_credit")]
    public bool IsCredit { get; set; }

    [JsonProperty("cus_birthdate")]
    public DateTime Birthdate { get; set; }

    [JsonProperty("cus_address")]
    public string? Address { get; set; }

    [JsonProperty("cus_phone")]
    public string? Phone { get; set; }

}

public class ExternalInvoiceDetail
{
    [JsonProperty("det_id")]
    public int DetailId { get; set; }

    [JsonProperty("det_product_id")]
    public int ProductId { get; set; }

    [JsonProperty("det_quantity")]
    public int Quantity { get; set; }

    [JsonProperty("det_total_amount")]
    public decimal TotalAmount { get; set; }

    [JsonProperty("det_product_name")]
    public string? ProductName { get; set; }

    [JsonProperty("det_product_price")]
    public decimal ProductPrice { get; set; }

    [JsonProperty("det_included_iva")]
    public bool IncludedIva { get; set; }

    [JsonProperty("det_iva")]
    public decimal Iva { get; set; }

    [JsonProperty("head_id_id")]
    public string? InvoiceId { get; set; }

}


