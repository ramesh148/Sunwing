using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http.Tracing;

namespace Sunwing.ContactManager.WebApi.Helpers
{
    public class NLogger : ITraceWriter
    {
        private static readonly Logger ClassLogger = LogManager.GetCurrentClassLogger();

        private static readonly Lazy<Dictionary<TraceLevel, Action<string>>> LoggingMap = new
            Lazy<Dictionary<TraceLevel, Action<string>>>(() => new Dictionary<TraceLevel, Action<string>>
            {
                { TraceLevel.Info, ClassLogger.Info },
                { TraceLevel.Debug, ClassLogger.Debug },
                { TraceLevel.Error, ClassLogger.Error },
                { TraceLevel.Fatal, ClassLogger.Fatal },
                { TraceLevel.Warn, ClassLogger.Warn },
            });

        public Dictionary<TraceLevel, Action<string>> Logger { get { return LoggingMap.Value; } }

        public void Trace(HttpRequestMessage request, string category, TraceLevel level, Action<TraceRecord> traceAction)
        {
            if (level != TraceLevel.Off)
            {
                if (traceAction != null && traceAction.Target != null)
                {
                    category = category + Environment.NewLine + "Action Parameters :" + traceAction.Target.ToString();

                }

                var record = new TraceRecord(request, category, level);

                if (traceAction != null) traceAction(record);

                Log(record);
            }
        }

        private void Log(TraceRecord record)
        {
            var message = new StringBuilder();
            var request = record.Request;

            if (!string.IsNullOrEmpty(record.Message))
            {
                message.Append("Method:" + request.Method + Environment.NewLine);
            }

            if (request.RequestUri != null)
            {
                message.Append("").Append("URL:" + request.RequestUri + Environment.NewLine);
            }

            if (request.Headers != null && request.Headers.Contains("Token") && request.Headers.GetValues("Tokern").FirstOrDefault() != null)
            {
                message.Append("").Append("Token:" + request.Headers.GetValues("Token").FirstOrDefault() + Environment.NewLine);
            }

            if (!string.IsNullOrEmpty(record.Category))
                message.Append("").Append(record.Category);

            if (!string.IsNullOrWhiteSpace(record.Operator))
                message.Append(" ").Append(record.Operator).Append(" ").Append(record.Operation);

            Logger[record.Level](Convert.ToString(message) + Environment.NewLine);
        }
    }
}